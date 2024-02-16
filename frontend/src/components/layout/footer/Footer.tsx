function Footer():JSX.Element{
    return (
        <footer className={'bg-teal-950 text-white p-5'}>
            <img src={'https://logodix.com/logo/1597040.png'} title={"logo"} alt={"logo"} className={"w-[50px]"}/>
            <ul className={'mt-5'}>
                <li>N0. 291/1/A, Main Rd, Panadura</li>
                <li>+94 70 248 7524</li>
                <li>+94 76 57 59 780</li>
                <li>dilushaeka99@gmail.com</li>
            </ul>
            <div className={'mt-5 text-center'}>
                Copyright © 2023 Dilusha Labs Inc.

                Trademark Policy
            </div>
        </footer>
    )
}
export default Footer