
import { FunctionComponent, ReactNode } from "react";

interface FindingsProps {
    id: ReactNode,
    quote: ReactNode,
    author: ReactNode,
}

const Findings: FunctionComponent<FindingsProps> = (props) => {

    const { id, quote, author } = props;

    return (

        <div className="md:flex md:justify-center md:flex-wrap gap-6">
            <div className="w-full h-100 p-3 border bg-white mt-7 rounded-lg md:w-85">
                <div className="flex items-center gap-1">

                    <p className="text-blue-500 font-semibold text-sm ">id: {id}</p>
                </div>
                <p className="text-lg font-semibold mt-1 text-justify">{quote}</p>
                <p className="text-sm mt-3 text-blue-500">Autor: {author}</p>

            </div>


        </div>


    );

}

export default Findings;