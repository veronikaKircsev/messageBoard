import {FormEvent} from 'react';
import React, { useRef, useEffect } from 'react';
import styles from './style.module.css';
import style from './addMessageForm.module.css';

type Props = {
  onSubmit(text: string): void;
  increment(): void;
};

export default function AddTodoForm({onSubmit, increment}: Props) {
  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = data.get('subject') as string;
    const body = data.get('body') as string;

    onSubmit(`${subject}, ${body}`);
    increment();

    form.reset();
    form.subject.focus();
  }

  const subjectRef = useRef(null);
  const bodyRef = useRef(null);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    // Focus the subject field when the component mounts
    subjectRef.current.focus();
  }, []);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        // Move focus to the body field when the down arrow is pressed
        bodyRef.current.focus();
        break;
      case 'ArrowUp':
        // Move focus to the subject field when the up arrow is pressed
        subjectRef.current.focus();
        break;
      case 'Enter':
        // Submit the form when Enter is pressed
        submitButtonRef.current.click();
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.addMessageForm}>
    <form  onSubmit={onFormSubmit} onKeyDown={handleKeyDown}>
      <div className={style.form}>
        <label style={{fontWeight: 'bold'}} htmlFor="subject" >Subject</label>
        <input  className="AddSubject" type='text' required name="subject" style={{backgroundColor:'lightgreen'}} 
        id="subject" ref={subjectRef}/>
        <br />
        <label style={{fontWeight: 'bold'}} htmlFor="body">Body</label>
        <input  className={style.formbody} type='text' required name="body" style={{height: '100px', backgroundColor:'lightgreen'}}
        id="body" ref={bodyRef}/>
        <br />
        <button style={{width: '70px'}} ref={submitButtonRef} type="submit">Submit</button>
      </div>
    </form>
    </div>
  );
}

