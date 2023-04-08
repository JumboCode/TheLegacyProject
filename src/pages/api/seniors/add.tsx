import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";
import { z } from "zod";


const add = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      try {
        const bodySchema = z.object({
          name: z.string(),
          location: z.string(),
          description: z.string(),
          students: z.array(z.string()),
        });

        const body = bodySchema.parse(JSON.parse(req.body));

        const senior = await prisma.senior.create({
          data: {
            name: body.name,
            location: body.location,
            description: body.description,
            StudentIDs: body.students,
            folder: `THIS NEEDS TO BE FIXED ONCE A FOLDER IS CRREATED YUP`
          }
        });
      } catch {
        res.status(500).json({
          error: `failed to create senior`,
        });
      }
      break;

    default:
      res.status(500).json({
        error: `method ${req.method} not implemented`,
      });
      break;
  }
}

const senior = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method = "POST") {
    try {
      const body = JSON.parse(req.body);
      if (body) { // TODO: check if fields are well formed
        const senior = await prisma.senior.create({
          data: { 
            id = body.id,
            name = body.name,
            location = body.location,
            description = body.description,
            photo = body.photo,
            StudentIDs = body.StudentIDs,
            Students = body.Students,
            Files = body.Files,
            Tags = body.Tags,
          }
        }) 
      } else {
        // throw new Error("One or more of the values is not well-defined.");
      }                
    };
      res.status(200).json(senior);
    } catch (error) {
      res.status(500).json({
      error: `failed to create senior`,
      });
    }
  } else {
    res.status(500).json({
      error: `method ${req.method} not implemented`,
    });
  }
};

export default senior;
