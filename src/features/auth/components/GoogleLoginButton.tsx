import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "@/features/auth/hooks";
import { errorToast } from "@/utils";

export function GoogleLoginButton() {
  const googleAuthMutation = useGoogleAuth();

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            googleAuthMutation.mutate(credentialResponse.credential);
          }
        }}
        onError={() => {
          errorToast("Google sign-in failed. Please try again.");
        }}
        useOneTap={false}
        theme="outline"
        size="large"
        text="signin_with"
        shape="rectangular"
        width="100%"
      />
    </div>
  );
}
