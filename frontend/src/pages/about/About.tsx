

function About():JSX.Element{
    return(
        <div>
            about
            <button className={'main-btn flex hover:bg-fuchsia-400'} onClick={()=>alert("hello")}>Read More...</button>

        </div>
    )
}
export default About