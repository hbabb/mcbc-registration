import type { NeonDbError } from '@neondatabase/serverless';

import * as Sentry from '@sentry/nextjs';
import { createSafeActionClient } from 'next-safe-action';
import { z } from 'zod';

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e, utils) {
    const { clientInput, metadata } = utils;

    // Handle specific Neon database errors
    if (e.constructor.name === 'NeonDbError') {
      const { code, detail } = e as NeonDbError;

      // Unique constraint violation (common for emails, phone numbers)
      if (code === '23505') {
        return `This information is already registered. ${detail}`;
      }

      // Foreign key constraint violation
      if (code === '23503') {
        return 'Registration data relationship error. Please try again.';
      }

      // Not null constraint violation
      if (code === '23502') {
        return 'Required information is missing. Please check all required fields.';
      }
    }
    // Capture all errors with Sentry
    Sentry.captureException(e, (scope) => {
      scope.clear();
      scope.setContext('serverError', {
        message: e.message,
        stack: e.stack,
        name: e.constructor.name,
      });
      scope.setContext('metadata', {
        actionName: metadata?.actionName,
      });
      scope.setContext('clientInput', {
        clientInput,
      });
      scope.setTag('error_type', 'server_action');
      scope.setTag('action_name', metadata?.actionName || 'unknown');
      return scope;
    });

    // Return user-friendly error messages
    if (e.constructor.name === 'NeonDbError') {
      return 'Database Error: Your registration could not be saved. Please try again or contact support@motlowministries.com if the issue continues.';
    }

    // Generic error fallback
    return 'Registration failed. Please try again. If the problem persists, contact support@motlowministries.com';
  },
});
