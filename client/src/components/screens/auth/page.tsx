import { ErrorPopup, Meta } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { FC, useState } from "react";
import Form from "./Form";

const buttons: { type: "login" | "registration"; title: string }[] = [
  { type: "login", title: "Увійти" },
  { type: "registration", title: "Зареєструватися" },
];

const Auth: FC = () => {
  const [type, setType] = useState<"login" | "registration">("login");

  const { error } = useAuth();

  return (
    <>
      <Meta title="Auth" />
      <main className="w-screen h-screen center bg-cyan-600">
        <article className="bg-white p-5 rounded shadow-lg w-[300px]">
          <div className="flex">
            {buttons.map((btn) => (
              <button
                key={btn.type}
                onClick={() => setType(btn.type)}
                className={`flex-1 border-b-2 pb-2 ${
                  type === btn.type
                    ? "border-black font-semibold"
                    : "text-gray-400"
                }`}
              >
                {btn.title}
              </button>
            ))}
          </div>
          <Form type={type} />
        </article>
        {error && (
          <ErrorPopup
            text={
              error?.payload?.response?.status === 401 || 404
                ? "Логін або пароль невірні"
                : error?.payload?.response?.status === 400
                ? "Пошта вже зареєстрована"
                : "Щось пішло не так"
            }
          />
        )}
      </main>
    </>
  );
};

export default Auth;
