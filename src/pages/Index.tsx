import { useState } from "react";
import { LoginPage } from "../components/LoginPage";
import { OnboardingPage, OnboardingData } from "../components/OnboardingPage";
import { MainApp } from "../components/MainApp";

type AppState = "login" | "onboarding" | "app";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("login");
  const [userData, setUserData] = useState<OnboardingData | null>(null);

  const handleLogin = () => {
    // For returning users, skip onboarding
    // For demo, we'll go to onboarding
    setAppState("onboarding");
  };

  const handleSignUp = () => {
    setAppState("onboarding");
  };

  const handleOnboardingComplete = (data: OnboardingData) => {
    setUserData(data);
    setAppState("app");
  };

  return (
    <>
      {appState === "login" && (
        <LoginPage onLogin={handleLogin} onSignUp={handleSignUp} />
      )}
      {appState === "onboarding" && (
        <OnboardingPage onComplete={handleOnboardingComplete} />
      )}
      {appState === "app" && userData && (
        <MainApp userName={userData.nickname || userData.name} petName={userData.petName} />
      )}
    </>
  );
};

export default Index;
