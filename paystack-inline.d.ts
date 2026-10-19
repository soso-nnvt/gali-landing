declare module "@paystack/inline-js" {
  export default class PaystackPop {
    resumeTransaction(
      accessCode: string,
      handlers?: {
        onSuccess?: (response?: any) => void;
        onCancel?: () => void;
        onError?: (error?: any) => void;
      }
    ): void;
    newTransaction(options: Record<string, any>): void;
  }
}
