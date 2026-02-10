import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "@/features/auth/hooks";
import { errorToast } from "@/utils";
import { useTheme } from "@/shared/hooks/useTheme";

export function GoogleLoginButton() {
  const googleAuthMutation = useGoogleAuth();
  const { resolvedTheme } = useTheme();

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
        theme={resolvedTheme === "dark" ? "filled_black" : "outline"}
        size="large"
        text="signin_with"
        shape="rectangular"
        width="100%"
      />
    </div>
  );
}
