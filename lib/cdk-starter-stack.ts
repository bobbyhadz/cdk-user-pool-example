import * as cognito from '@aws-cdk/aws-cognito';
import * as cdk from '@aws-cdk/core';

export class CdkStarterStack extends cdk.Stack {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 User Pool
    const userPool = new cognito.UserPool(this, 'userpool', {
      userPoolName: 'my-user-pool',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        givenName: {
          required: true,
          mutable: true,
        },
        familyName: {
          required: true,
          mutable: true,
        },
      },
      customAttributes: {
        bio: new cognito.StringAttribute({mutable: true}),
        country: new cognito.StringAttribute({mutable: true}),
        city: new cognito.StringAttribute({mutable: true}),
        isAdmin: new cognito.StringAttribute({mutable: true}),
      },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: true,
        requireDigits: true,
        requireUppercase: false,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
    });

    // const cfnUserPool = userPool.node.defaultChild as cognito.CfnUserPool;

    // cfnUserPool.emailConfiguration = {
    //   emailSendingAccount: 'DEVELOPER',
    //   replyToEmailAddress: 'YOUR_EMAIL@example.com',
    //   sourceArn: `arn:aws:ses:cognito-ses-region:${
    //     cdk.Stack.of(this).account
    //   }:identity/YOUR_EMAIL@example.com`,
    // };

    // // 👇 User Pool Client

    // const clientReadAttributes = new cognito.ClientAttributes()
    //   .withStandardAttributes({
    //     givenName: true,
    //     familyName: true,
    //     email: true,
    //     emailVerified: true,
    //     address: true,
    //     birthdate: true,
    //     gender: true,
    //     locale: true,
    //     middleName: true,
    //     fullname: true,
    //     nickname: true,
    //     phoneNumber: true,
    //     phoneNumberVerified: true,
    //     profilePicture: true,
    //     preferredUsername: true,
    //     profilePage: true,
    //     timezone: true,
    //     lastUpdateTime: true,
    //     website: true,
    //   })
    //   .withCustomAttributes(...['bio', 'country', 'city']);

    // const clientWriteAttributes = clientReadAttributes.withCustomAttributes(
    //   ...['isAdmin'],
    // );

    // const userPoolClient = new cognito.UserPoolClient(this, 'userpool-client', {
    //   userPool,
    //   authFlows: {
    //     adminUserPassword: true,
    //     custom: true,
    //     userSrp: true,
    //   },
    //   supportedIdentityProviders: [
    //     cognito.UserPoolClientIdentityProvider.COGNITO,
    //   ],
    //   preventUserExistenceErrors: true,
    //   readAttributes: clientReadAttributes,
    //   writeAttributes: clientWriteAttributes,
    // });
  }
}
