import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@server/db/client";

export default function students(req, res) {
  if (req.method === 'GET') 
  {
    // Process a GET request
	try 
	{
	const result = await prisma.user.findMany({
	select: 
	{
	include: {Students: true,},
	}
	});
	
	res.status(200).json({result});
	} 
	catch (error) 
	{
		res.status(500).json({
        error: `failed to fetch data with id 0: ${error}`,
    });
      }
      break;
  } 
  else 
  {
    // Handle any other HTTP method
  }
}