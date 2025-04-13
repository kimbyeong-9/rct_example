const AdminLogin = () => {
  return (
    <div>
      <h1>관리자 로그인</h1>
      <form>
        <div>
          <label>아이디</label>
          <input type="text" />
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default AdminLogin; 