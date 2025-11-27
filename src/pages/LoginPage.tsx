

export const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </div>
           <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </div>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary w-full">Login</button>
            <button className="btn btn-outline w-full mt-2">Login with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};
