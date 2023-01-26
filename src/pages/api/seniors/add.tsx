import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";

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
            biography = body.biography,
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
