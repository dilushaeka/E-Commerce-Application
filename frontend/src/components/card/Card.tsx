function Card():JSX.Element{
    return (
        <div className={'border-s-black bg-amber-300  p-4 m-5 w-72'}>
            <img src={'https://logodix.com/logo/1597040.png'}  />
            <h1 className={'text-2xl font-bold mb-2'}>title</h1>
            {/*<p className={'my-5'}>{this.props.content}</p>*/}
            <button className={'main-btn'} >Read More...</button>
        </div>
    )
}
export default Card