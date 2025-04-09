import { useLocalStorage } from '@mantine/hooks';
import { createContext, ReactNode, useContext } from 'react';
import Fly from './Fly';

interface FlyContextType {
    hasFly: 'once-a-day' | 'once-a-week' | 'once-a-month' | 'never';
    setHasFly: (
        val:
            | 'once-a-day'
            | 'once-a-week'
            | 'once-a-month'
            | 'never'
            | ((
                  prevState:
                      | 'once-a-day'
                      | 'once-a-week'
                      | 'once-a-month'
                      | 'never'
              ) => 'once-a-day' | 'once-a-week' | 'once-a-month' | 'never')
    ) => void;
}

const FlyContext = createContext<FlyContextType>({
    hasFly: 'once-a-day',
    setHasFly: () => {},
});

export const FlyProvider = ({ children }: { children: ReactNode }) => {
    const [hasFly, setHasFly] = useLocalStorage<
        'once-a-day' | 'once-a-week' | 'once-a-month' | 'never'
    >({
        defaultValue: 'once-a-day',
        key: 'hasFly',
    });

    const numberOfFlies = {
        'once-a-day': 0,
        'once-a-week': 1,
        'once-a-month': 10,
        never: 50,
    };

    return (
        <FlyContext.Provider value={{ hasFly, setHasFly }}>
            {new Array(numberOfFlies[hasFly] || 0).fill(0).map((_, index) => (
                <Fly key={index} />
            ))}
            {children}
        </FlyContext.Provider>
    );
};

const useFly = () => {
    const context = useContext(FlyContext);
    return context;
};

FlyProvider.use = useFly;
