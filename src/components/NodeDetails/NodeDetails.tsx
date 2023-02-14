import React, { memo, useCallback } from 'react';
import classNames from 'classnames';
import type { Node } from 'relatives-tree/lib/types';
import { Relations } from './Relations';
import css from './NodeDetails.module.css';
import { format } from "date-fns";

interface NodeDetailsProps {
  node: Readonly<Node>;
  className?: string;
  onSelect: (nodeId: string | undefined) => void;
  onHover: (nodeId: string) => void;
  onClear: () => void;
}

const stringDate = function(date: string){
  if (date != "-"){
    return format(new Date(date), "MMMM d, yyyy")
  } else {
    return "-"
  }
}

export const NodeDetails = memo(
  function NodeDetails({ node, className, ...props }: NodeDetailsProps) {
    const closeHandler = useCallback(() => props.onSelect(undefined), [props]);
    return (
      <section className={classNames(css.root, className)}>
        <header className={css.header}>
          <h3 className={css.title}>{node.name}</h3>
          <button className={css.close} onClick={closeHandler}>&#10005;</button>
        </header>
        <p>born: {stringDate(node.born)}</p>
        <p>died: {stringDate(node.died)}</p>
        <Relations {...props} title="Parents" items={node.parents} />
        <Relations {...props} title="Children" items={node.children} />
        <Relations {...props} title="Siblings" items={node.siblings} />
        <Relations {...props} title="Spouses" items={node.spouses} />
      </section>
    );
  },
);
