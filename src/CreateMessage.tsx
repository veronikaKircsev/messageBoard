

type Props = {
    subject: string;
    body: string;
  };
  

export default function CreateMessages({subject, body}:Props){

    return(
        <div>
        <h3 style={{ fontWeight: 'bold' }}>{subject}</h3>
        <p style={{ fontStyle: 'italic' }}>{body}</p>
        </div>
    )
}