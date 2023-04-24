import { FC } from "react";
import { Formik } from "formik";
import { Button, Input } from "@/components/ui";
import { useActions } from "@/hooks/useActions";
import * as Yup from "yup";

interface Props {
  type: "login" | "registration";
}

const Form: FC<Props> = ({ type }) => {
  const { login, registration } = useActions();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Обов'язкове поле")
          .email("Введіть ел. пошту"),
        password: Yup.string()
          .required("Обов'язкове поле")
          .min(6, "Мін. 6 символів"),
      })}
      onSubmit={(values) => {
        if (type === "login") {
          login(values);
        } else {
          registration(values);
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Input
            wrapperStyles="mt-3"
            labelText="Пошта"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.email}
          />
          <Input
            wrapperStyles="mt-3"
            labelText="Пароль"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.password}
          />
          <Button restStyles="w-full mt-6">
            {type === "login" ? "Увійти" : "Зареєструватися"}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default Form;
