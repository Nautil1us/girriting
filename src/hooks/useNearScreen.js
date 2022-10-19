import {useEffect, useState, useRef} from 'react';

export default function useNearScreen ({ distance = '100px', externalRef, once = true } = {} ){
    const [isNearScreen, setShow] = useState(false)
    const fromRef = useRef()
    
    useEffect(() => {
        let observer

        const element = externalRef ? externalRef.current : fromRef.current
       
        /*
        Si le manda el externalRef que sera la referencia para el observardor en caso de que no se utiliza el useRef().
        esta chingadera está dificil, ten cuidado
        */
        const onChange = (entries, observer) => {
           const el = entries[0]
            if (el.isIntersecting) {
                setShow(true)
                once && observer.disconnect()
            } else {
                !once && setShow(false)
            }
        }
       
        /*
        Comprueba que tenga intersectionobserver es un función que se corre cuando de ve un objeto,
        alguno navegadores lo tienen otros no, por eso utlizamos un herramienta para agregarlo en caso de que no 
        lo soporte el navegador
        */
        Promise.resolve(
           typeof IntersectionObserver !== 'undefined'
            ? IntersectionObserver
            : import('intersection-observer')
            ).then(() => {
                observer = new IntersectionObserver(onChange, {
                    rootMargin: distance
                })
                if (element) observer.observe(element)
            })

        return () => observer && observer.disconnect()
    },)

    return {isNearScreen, fromRef}
}
