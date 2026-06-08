import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
          <h1 className="font-display text-3xl text-muziika-orange">Something went wrong</h1>
          <p className="mt-4 max-w-lg font-inter text-sm text-white/70">{this.state.error.message}</p>
          <button
            type="button"
            className="mt-6 rounded-full bg-muziika-orange px-6 py-2 font-inter text-sm"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
