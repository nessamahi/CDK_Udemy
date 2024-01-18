#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkStarterStack } from "../lib/cdk_starter-stack";
import { PhotosStack } from "../lib/photosStack";
import { PhotosHandlerStack } from "../lib/photosStackHandler";
import { BucketTagger } from "./tagger";

const app = new cdk.App();
//this has a bucket
const photoStack = new PhotosStack(app, "PhotosStack");
//this puts data using the PhotosStack bucket
new PhotosHandlerStack(app, "PhotosHandlerStack", {
  targetBucketArn: photoStack.photosbucketArn,
});

const tagger = new BucketTagger("level", "test");
cdk.Aspects.of(app).add(tagger);

// new CdkStarterStack(app, "CdkStarterStack", {
//   /* If you don't specify 'env', this stack will be environment-agnostic.
//    * Account/Region-dependent features and context lookups will not work,
//    * but a single synthesized template can be deployed anywhere. */
//   /* Uncomment the next line to specialize this stack for the AWS Account
//    * and Region that are implied by the current CLI configuration. */
//   // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
//   /* Uncomment the next line if you know exactly what Account and Region you
//    * want to deploy the stack to. */
//   // env: { account: '123456789012', region: 'us-east-1' },
//   /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
// });
