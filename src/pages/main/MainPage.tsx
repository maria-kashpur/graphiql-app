import styles from './MainPage.module.scss';
import { Allotment, AllotmentHandle } from 'allotment';
import DocIcon from '../../assets/book.svg?react';
import PlayIcon from '../../assets/play.svg?react';
import PrettifyIcon from '../../assets/prettify.svg?react';
import 'allotment/dist/style.css';
import { useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';

function MainPage() {
  const ref = useRef<AllotmentHandle>(null!);
  const [isVisible, setIsVisible] = useState(false);

  const handleDocIconClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.container}>
      <Allotment defaultSizes={[1, 3, 4, 4]} minSize={50}>
        <Allotment.Pane minSize={60} maxSize={60}>
          <div className={styles.docContainer}>
            <button className={styles.docButton} onClick={handleDocIconClick}>
              <DocIcon className={styles.docIcon} />
            </button>
          </div>
        </Allotment.Pane>
        <Allotment.Pane visible={isVisible}>
          <div>Documentation</div>
        </Allotment.Pane>
        <Allotment.Pane minSize={300}>
          <Allotment vertical defaultSizes={[100, 1]} ref={ref}>
            <Allotment.Pane minSize={50}>
              <div className={styles.requestContainer}>
                Request
                <div className={styles.request}>
                  <div className={styles.requestEditor}>
                    <CodeMirror />
                  </div>
                  <div className={styles.requestButtons}>
                    <button>
                      <PlayIcon className={styles.icon} />
                    </button>
                    <button>
                      <PrettifyIcon className={styles.icon} />
                    </button>
                  </div>
                </div>
              </div>
            </Allotment.Pane>
            <Allotment.Pane minSize={100}>
              <div>
                Variables Headers
                <CodeMirror />
              </div>
            </Allotment.Pane>
          </Allotment>
        </Allotment.Pane>
        <Allotment.Pane minSize={50}>
          <div className={styles.responseContainer}>Response</div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}

export default MainPage;
