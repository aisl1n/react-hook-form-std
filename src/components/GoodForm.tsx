import { useForm } from "react-hook-form";
import validator from "validator";

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  profession: string;
  privacyTerms: boolean;
}

const GoodForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data));
  };

  const watchPassword = watch("password");

  return (
    <div className="app-container">
      <h1>React Hook Form</h1>
      <div className="form-group">
        <label>Nome</label>
        <input
          className={errors?.name && "input-error"}
          type="text"
          placeholder="Seu nome"
          {...register("name", { required: true })}
        />
        {errors?.name?.type === "required" && <p className="error-message">Name is required.</p>}
      </div>

      <div className="form-group">
        <label>E-mail</label>
        <input
          className={errors?.email && "input-error"}
          type="email"
          placeholder="Seu e-mail"
          {...register("email", { required: true, validate: (value) => validator.isEmail(value) })}
        />
        {errors?.email?.type === "required" && <p className="error-message">E-mail is required.</p>}
        {errors?.email?.type === "validate" && <p className="error-message">E-mail must be a valid email.</p>}
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          className={errors?.password && "input-error"}
          type="password"
          placeholder="Senha"
          {...register("password", { required: true, minLength: 7 })}
        />
        {errors?.password?.type === "minLength" && (
          <p className="error-message">Password must have at least 7 characters.</p>
        )}
        {errors?.password?.type === "required" && <p className="error-message">Password is required.</p>}
      </div>

      <div className="form-group">
        <label>Confirmar senha</label>
        <input
          className={errors?.passwordConfirm && "input-error"}
          type="password"
          placeholder="Digite novamente sua senha"
          {...register("passwordConfirm", {
            required: true,
            minLength: 7,
            validate: (value) => value === watchPassword,
          })}
        />
        {errors?.passwordConfirm?.type === "validate" && <p className="error-message">Passwords does not match!</p>}
        {errors?.passwordConfirm?.type === "minLength" && (
          <p className="error-message">Password must have at least 7 characters.</p>
        )}
        {errors?.passwordConfirm?.type === "required" && <p className="error-message">Confirm password is required.</p>}
      </div>

      <div className="form-group">
        <label>Profissão</label>
        <select
          {...register("profession", { validate: (value) => value !== "0" })}
          className={errors?.profession && "input-error"}
        >
          <option value="0">Selecione sua profissão...</option>
          <option value="developer">Desenvolvedor</option>
          <option value="other">Outra</option>
        </select>

        {errors?.profession?.type === "validate" && <p className="error-message">Profession is required.</p>}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input type="checkbox" {...register("privacyTerms", { required: true })} />
          <label>I agree with the privacy terms.</label>
        </div>

        {errors?.privacyTerms?.type === "required" && (
          <p className="error-message">You must agree with privacy terms.</p>
        )}
      </div>

      <div className="form-group">
        <button onClick={() => handleSubmit(onSubmit)()}>Criar conta</button>
      </div>
    </div>
  );
};

export default GoodForm;
