"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CurrentQuestion {
    currentQuestion: number;
    setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
}

const CurrentQuestionContext = createContext<CurrentQuestion | undefined>(undefined);

interface VingadoresProviderProps {
    children: ReactNode;
}

export function CurrentQuestionProvider({ children }: VingadoresProviderProps) {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    return (
        <CurrentQuestionContext.Provider value={{ currentQuestion, setCurrentQuestion }}>
            {children}
        </CurrentQuestionContext.Provider>
    );
}

export function useCurrentQuestion(): CurrentQuestion {
    const context = useContext(CurrentQuestionContext);
    if (!context) {
        throw new Error('useCurrentQuestion deve ser usado dentro de um VingadoresProvider');
    }
    return context;
}