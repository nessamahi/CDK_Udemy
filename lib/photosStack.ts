import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Fn } from "aws-cdk-lib";

export class PhotosStack extends cdk.Stack {
  private stackSuffix: string;
  public readonly photosbucketArn: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props); // here we're constructing the stack

    this.initializeSuffix();

    // const mybucket = new Bucket(this, "PhotosBucketNew", {
    //   bucketName: "photosbucket-123abc123abc",
    // });

    const photosBucket = new Bucket(this, "PhotosBucket11", {
      bucketName: `photosbucket112-${this.stackSuffix}`,
    });

    this.photosbucketArn = photosBucket.bucketArn;

    // (mybucket.node.defaultChild as CfnBucket).overrideLogicalId(
    //   "PhotosBucketNewNew"
    // );

    // new cdk.CfnOutput(this, "photos-bucket", {
    //   //references resources around AWS
    //   value: photosBucket.bucketArn,
    //   exportName: "photos-bucket",
    // });
  }

  private initializeSuffix() {
    //we want to first get the stack id, and this is available at the point when we're constructing our stack
    // arn:aws:cloudformation:us-west-2:992382648930:stack/PhotosStack/bb9ad2d0-b632-11ee-ab26-064897a4504d
    // index : 2 is this part of the stackID : bb9ad2d0-b632-11ee-ab26-064897a4504d
    const shortStackId = Fn.select(2, Fn.split("/", this.stackId));
    //stackSuffix will be this = 064897a4504d
    this.stackSuffix = Fn.select(4, Fn.split("-", shortStackId));
  }
}
