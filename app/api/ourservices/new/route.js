import Service from "@models/serviceModel";
import path from "path";
import fs from "fs";
import { cloudinary } from "@utils/cloudinary";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

const getFormDataFields = (formData) => {
  const fields = {};
  let files = [];

  for (const [fieldName, fieldValue] of formData.entries()) {
    if (fieldValue instanceof Blob) {
      files.push({ name: fieldName, file: fieldValue });
    } else {
      fields[fieldName] = fieldValue;
    }
  }
  return { fields, files };
};

const checkFileType = (blob) => {
  // We only want to accept image files of type jpg, jpeg, and png.
  // If file is not such, we reject it.
  const allowedTypes = /jpg|jpeg|png/;

  if (!allowedTypes.test(path.extname(blob.name).toLowerCase())) {
    throw new Error("Please upload either a jpeg, jpg or a pn file online");
  }
};
const saveFileToDisk = async (blob) => {
  checkFileType(blob);

  try {
    const blobBuffer = Buffer.from(await blob.arrayBuffer());
    const extname = path.extname(blob.name);
    const partName = path.basename(blob.name, extname);
    const filename = `${partName}-${Date.now()}${extname}`;
    const destinationPath = "public/assets/uploads/" + filename;

    // Write the Blob data to the destination file
    fs.writeFile(destinationPath, blobBuffer, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }

      console.log("File saved successfully to upload folder");
    });
    return destinationPath;
  } catch (error) {
    console.log("error: ", error.message);
  }
};

export const POST = async (req, res) => {
  await connectToDB();

  try {
    const form = await req.formData();
    const { fields, files } = getFormDataFields(form);
    const {
      name,
      slug,
      description,
      images,
      category,
      availability,
      quantity,
      rating,
      numReviews,
    } = fields;

    const filePaths = await Promise.all(
      files.map(async (fileData) => {
        return await saveFileToDisk(fileData.file);
      })
    );

    const newServiceExists = await Service.findOne({ name });
    if (newServiceExists) {
      return NextResponse.json(
        { message: "You have already added this service" },
        {
          status: 400,
        }
      );
    }
    const servicesFolder = "mysiga/services";
    for (const filePath of filePaths) {
      if (filePath) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(filePath, {
            folder: servicesFolder,
          });

          fs.unlinkSync(filePath);

          newService.images.push({
            public_id: uploadResponse.public_id,
            url: uploadResponse.url,
          });
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError.message);
        }
      }
    }

    const newService = new Service({
      name,
      slug,
      description,
      category,
      availability,
      quantity: quantity ? Number(quantity) : 1,
      rating: rating ? Number(rating) : 0,
      numReviews: [
        {
          rating: numReviews ? Number(numReviews) : 0,
        },
      ],
    });

    await newService.save();
    console.log(newService);

    if (newService) {
      return new Response(
        JSON.stringify({
          _id: newService._id,
          name: newService.name,
          slug: newService.slug,
          description: newService.description,
          images: newService.images,
          category: newService.category,
          availability: newService.availability,
          quantity: newService.quantity,
          rating: newService.rating,
          numReviews: newService.numReviews,
        }),
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid service data" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return new Response("failed to create a new user", { status: 500 });
  }
};
