import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const signup = async (email, password, displayName) => {
  error.vale = null;

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw Error("Could not complete the signup");
    }

    console.log(res.user);

    await res.user.updateProfile({ displayName });
    error.value = null;

    return res;
  } catch (err) {
    error.value = err.message;
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
