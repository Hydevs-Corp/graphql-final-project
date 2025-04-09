import { ReactElement } from 'react';

const BackgroundProvider = ({ children }: { children: ReactElement }) => {
    return <div className="background">{children}</div>;
};

export default BackgroundProvider;
