import React, { useContext, useEffect } from 'react'
import LinkHighlightContext from '../../../contexts/LinkHighlightContext';
import { Helmet } from 'react-helmet-async';

const LogIndex = () => {
  const { setCurrentPath } = useContext(LinkHighlightContext);

  useEffect(() => {
    setCurrentPath("logs");
    return () => {
      setCurrentPath("");
    };
  }, [setCurrentPath]);

  return (
    <>
      <Helmet>
        <title>Logs - LapasPanic</title>
      </Helmet>
      <div>
        <p>Lapas</p>
      </div>
    </>
  )
}

export default LogIndex