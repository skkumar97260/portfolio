

export const saveToken = (data) => {
  localStorage.setItem("token", data?.token);
  localStorage.setItem("loginType", data?.loginType);

  if (data?.adminId) {
    localStorage.setItem(
      "adminId",
      data?.adminId, "project"
    );
  } 
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getLoginType = () => {
  return localStorage.getItem("loginType");
};

export const getAdminId = () => {
  const adminId = localStorage.getItem("adminId");
  
  return adminId;
};



export const clearStorage = () => {
  localStorage.clear();
};
