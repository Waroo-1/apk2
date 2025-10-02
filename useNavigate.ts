export function useNavigate() {
  return (path: string) => {
    console.log('Navigate to:', path);
  };
}
