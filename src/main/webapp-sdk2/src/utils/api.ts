const runApiRequest = async <Response>(path: string): Promise<Response> => {
  const url = new URL(path, window.location.href);
  const token = await miro.board.getIdToken();
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Miro-Token": token,
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  const data = await response.json();
  return data;
};

interface UserInfo {
  id: number;
  name: string;
}
export const getUserData = () => {
  return runApiRequest<UserInfo>("/get-self-user");
};
