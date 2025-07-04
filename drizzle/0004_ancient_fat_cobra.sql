ALTER TABLE "auth_accounts" RENAME TO "account";--> statement-breakpoint
ALTER TABLE "auth_authenticators" RENAME TO "authenticator";--> statement-breakpoint
ALTER TABLE "auth_sessions" RENAME TO "session";--> statement-breakpoint
ALTER TABLE "auth_users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "auth_verification_tokens" RENAME TO "verificationToken";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "account" RENAME COLUMN "provider_account_id" TO "providerAccountId";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "credential_id" TO "credentialID";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "provider_account_id" TO "providerAccountId";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "credential_public_key" TO "credentialPublicKey";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "credential_device_type" TO "credentialDeviceType";--> statement-breakpoint
ALTER TABLE "authenticator" RENAME COLUMN "credential_backed_up" TO "credentialBackedUp";--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "session_token" TO "sessionToken";--> statement-breakpoint
ALTER TABLE "session" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "email_verified" TO "emailVerified";--> statement-breakpoint
ALTER TABLE "authenticator" DROP CONSTRAINT "auth_authenticators_credential_id_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "auth_users_name_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "auth_users_email_unique";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "auth_accounts_user_id_auth_users_id_fk";
--> statement-breakpoint
ALTER TABLE "authenticator" DROP CONSTRAINT "auth_authenticators_user_id_auth_users_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "auth_sessions_user_id_auth_users_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId");--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_credentialID_pk" PRIMARY KEY("userId","credentialID");--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token");--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" varchar DEFAULT 'admin' NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "authenticator" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "authenticator" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "session" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "updated_at";--> statement-breakpoint
ALTER TABLE "verificationToken" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_credentialID_unique" UNIQUE("credentialID");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");