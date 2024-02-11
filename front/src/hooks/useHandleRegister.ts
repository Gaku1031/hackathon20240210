import { useCallback } from "react"
import axios from "axios";
import { useRouter } from "next/router";
import { UseFormGetValues } from "react-hook-form";
import { RegisterFormType } from "@/services/schema/types";
import { toast } from "react-toastify";

type Props = {
  getValues: UseFormGetValues<RegisterFormType>;
  setIsLoading: (isLoading: boolean) => void;
}

export const useHandleRegister = ({
  getValues,
  setIsLoading,
}: Props) => {
  const router = useRouter();

  const handleRegister = useCallback(async () => {
    const http = axios.create({
      baseURL: "http://localhost",
      withCredentials: true,
    });

    const formData = getValues();

    try {
      setIsLoading(true);
      await http.get("/sanctum/csrf-cookie");
      await http.post("/api/register", {
        name: formData.name,
        email: formData.email,
        generation: formData.generation,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      await router.push("/login");
    } catch {
      toast.error("予期せぬエラーが発生しました。");
      setIsLoading(false);
    }
  }, [router, setIsLoading, getValues]);

  return { handleRegister };
}
