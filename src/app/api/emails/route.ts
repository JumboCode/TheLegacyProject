import { NextRequest, NextResponse } from "next/server";
import { Email, EmailResponse } from "./route.schema";
import { unknownErrorResponse } from "../route.schema";
import { prisma } from "@server/db/client";
import { mailchimp } from "@server/service";
import { env } from "@env/server.mjs";

export const POST = async (request: NextRequest) => {
  try {
    const email = Email.safeParse(await request.json());

    if (!email.success) {
      return NextResponse.json(
        EmailResponse.parse({
          code: "INVALID_EMAIL",
          message: "Invalid email submission",
        }),
        { status: 400 }
      );
    } else {
      const body = email.data;

      //Check for valid email
      const reg = new RegExp("[^s\t\n\r][^@]{1,64}@[^s\t\n\r]{1,255}");
      const validEmail = reg.test(body.email);

      if (!validEmail) {
        console.log(body.email);
        return NextResponse.json(
          EmailResponse.parse({
            code: "INVALID_EMAIL",
            message: "Invalid email submission",
          }),
          { status: 400 }
        );
      }

      // Check if the email already exists
      const hasSameEmail = await prisma.email.findFirst({
        where: {
          email: body.email,
        },
      });

      if (hasSameEmail) {
        return NextResponse.json(
          EmailResponse.parse({
            code: "DUPLICATE_EMAIL",
            message: "This email already exists",
          }),
          { status: 400 }
        );
      }

      await prisma.email.create({
        data: {
          email: body.email,
        },
      });

      await mailchimp.lists.addListMember(env.MAILCHIMP_AUDIENCE_ID, {
        email_address: body.email,
        status: "subscribed",
      });

      return NextResponse.json(
        EmailResponse.parse({
          code: "SUCCESS",
          message: "Email successfully submitted",
        }),
        { status: 200 }
      );
    }
  } catch {
    return NextResponse.json(unknownErrorResponse, { status: 500 });
  }
};
