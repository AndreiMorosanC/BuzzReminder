import { useAuth } from "../hooks/useAuth";

const SessionControl = () => {
  const { user, token, loading } = useAuth();

  // No renderiza nada visual
  return null;
};

export default SessionControl;
