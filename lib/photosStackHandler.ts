//this will contain some lambda logic that will put photos in the stack

import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Fn } from "aws-cdk-lib";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";

interface PhotosHandlerStackProps extends cdk.StackProps {
  targetBucketArn: string;
}

export class PhotosHandlerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PhotosHandlerStackProps) {
    super(scope, id, props); // here we're constructing the stack
    // const targetBucket = Fn.importValue("photos-bucket");

    //this lambda function needs a reference to a bucket
    new LambdaFunction(this, "PhotosHandler", {
      runtime: Runtime.NODEJS_16_X,
      handler: "index.handler",
      code: Code.fromInline(`
      export.handler = async (event) => {
        console.log("hello!: " +process.env.TARGET_BUCKET)
      }
      `),
      environment: {
        TARGET_BUCKET: props.targetBucketArn,
      },
    });
  }
}
