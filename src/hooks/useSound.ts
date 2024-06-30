import { useEffect, useRef } from "react";

export default function useSound(sound: string) {
    const audioEl = useRef<HTMLAudioElement>(null)

    const playSound = () => {
        if (audioEl.current) {
            audioEl.current.currentTime = 0;
            audioEl.current.play()
        }
    }

    // useEffect(() => {
    //     const audio = new Audio(sound);
    //     return () => audio.remove();
    // }, [sound]);

    useEffect(() => {
        audioEl.current = new Audio(sound)
    }, [sound])

    return playSound;
}