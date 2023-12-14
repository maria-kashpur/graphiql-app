import { useEffect, useRef, useState } from 'react';
import styles from './documentation..module.scss';
import { getSchemaTypes } from '@/utils/graphqlSchema';
import { ISchemaType } from '@/types/general';
import { useAppSelector } from '@/store/store';
import Schema from './schema/Schema/Schema';

function Documentation() {
  const [isLoading, setIsLoading] = useState(true);
  const types = useRef<ISchemaType[]>([]);
  const prevUrl = useRef<string>('');
  const tabs = useAppSelector((state) => state.tabs.tabs);
  const activeTab = useAppSelector((state) => state.tabs.activeTab);

  useEffect(() => {
    async function getAllTypes() {
      setIsLoading(true);
      if (tabs[activeTab].url === '') {
        return;
      }

      if (tabs[activeTab].url !== prevUrl.current) {
        types.current = await getSchemaTypes(tabs[activeTab].url);
        prevUrl.current = tabs[activeTab].url;
      }

      setIsLoading(false);
    }

    getAllTypes();
  }, [tabs[activeTab].url]);

  return (
    <div className={`${styles.docDescription} ${styles.container}`}>
      {isLoading ? <div>Loading...</div> : <Schema types={types.current} />}
    </div>
  );
}

export default Documentation;
