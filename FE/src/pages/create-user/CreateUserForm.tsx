import { useState, ChangeEvent, FormEvent } from "react";
import type { UserType } from "../../types/users";
import { useCreateUser } from "../../api/users/useCreateUser";

export const CreateUserForm = () => {
  const { mutateAsync: createUser } = useCreateUser();
  const [user, setUser] = useState<UserType>({
    email: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: 300,
      }}
    >
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
