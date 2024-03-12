function Contact():JSX.Element{
    return(
        <div>
            <h1 className={'border-l-4'}>contact</h1>
            <button className={'main-btn flex hover:bg-fuchsia-400'} onClick={()=>alert("hello")}>Read More...</button>
        </div>
    );
};
export default Contact