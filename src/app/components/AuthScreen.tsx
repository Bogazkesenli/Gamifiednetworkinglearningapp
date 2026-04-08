import { useState } from "react";

interface AuthScreenProps {
  onAuth: (userData: { fullName: string; email: string }) => void;
}

export function AuthScreen({ onAuth }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      onAuth({ fullName, email });
    } else {
      onAuth({ fullName: "User", email });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2" style={{ color: 'var(--primary)' }}>NetPath</h1>
          <p className="text-muted-foreground">Learn Computer Networking</p>
        </div>

        <div className="bg-card rounded-3xl shadow-lg p-8 border border-border">
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2.5 rounded-xl transition-colors ${
                isSignUp
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2.5 rounded-xl transition-colors ${
                !isSignUp
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block mb-2 text-foreground">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-input-background border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-input-background border border-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground shadow-md hover:opacity-90 transition-opacity mt-6"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
