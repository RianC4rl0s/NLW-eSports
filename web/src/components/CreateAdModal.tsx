import React, { useEffect, useState, FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog"
import { Input } from "./Form/Input";
import { Check, GameController } from "phosphor-react";

import * as CheckBox from "@radix-ui/react-checkbox"
import * as TogleGroup from "@radix-ui/react-toggle-group"
import axios from "axios";
interface Game {

    id: string;
    title: string;
    // banner: string;
    // _count: {
    //     ads: number
    // }
}
export const CreateAdModal = () => {

    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData);
        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                "name": data.name,
                "yearsPlaying": Number(data.yearsPlaying),
                "discord": data.discord,
                "weekDays": weekDays.map(Number),
                "hourStart": data.hourStart,
                "hourEnd": data.hourEnd,
                "useVoiceChannel": useVoiceChannel
            })
            alert("Anúncio criado com sucesso!")
        } catch (error) {
            alert("Erro ao Criar Anúncio!")
        }

    }

    useEffect(() => {
        axios("http://localhost:3333/games")
            .then(response => {
                setGames(response.data)
            })
    }, [])

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content
                className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25"
            >
                <Dialog.Title className="text-3xl font-black">
                    Publique um anúncio
                </Dialog.Title>


                <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                    <div className=" flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">Qual o game?</label>
                        <select
                            id="game"
                            name="game"
                            defaultValue=""
                            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                        >
                            <option disabled>
                                Selecione o game que deseja jogar
                            </option>
                            {games.map(game => {
                                return <option key={game.id} value={game.id}>{game.title}</option>

                            })}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input id="name" name="name" type="text" placeholder="Como te chamam dentro do game" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">Joga há quantos anosw</label>
                            <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual o seu Discord?</label>
                            <Input id="discord" name="discord" type="text" placeholder="Usuário#0000" />
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <TogleGroup.Root
                                type="multiple"
                                className="grid grid-cols-4 gap-2"
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <TogleGroup.Item
                                    value="0"
                                    className={`w-8 h-8 rounded  ${weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"}`}
                                    title="Domingo"
                                >
                                    D
                                </TogleGroup.Item>
                                <TogleGroup.Item
                                    value="1"
                                    className={`w-8 h-8 rounded  ${weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"}`}
                                    title="Segunda"
                                >
                                    S
                                </TogleGroup.Item>
                                <TogleGroup.Item
                                    value="2"
                                    className={`w-8 h-8 rounded  ${weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"}`}
                                    title="Terça"
                                >
                                    T
                                </TogleGroup.Item>
                                <TogleGroup.Item
                                    value="3"
                                    className={`w-8 h-8 rounded  ${weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"}`}
                                    title="Quarta"
                                >
                                    Q
                                </TogleGroup.Item>
                                <TogleGroup.Item
                                    value="4"
                                    className={`w-8 h-8 rounded  ${weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"}`}
                                    title="Quinta"
                                >
                                    Q
                                </TogleGroup.Item>
                                <TogleGroup.Item
                                    value="5"
                                    className={`w-8 h-8 rounded  ${weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"}`}
                                    title="Sexta"
                                >
                                    S
                                </TogleGroup.Item>
                                <TogleGroup.Item
                                    value="6"
                                    className={`w-8 h-8 rounded  ${weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"}`}
                                    title="Sábado"
                                >
                                    S
                                </TogleGroup.Item>
                            </TogleGroup.Root>

                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart">Qual horário do dia?</label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input name="hourStart" type="time" id="hourStart" placeholder="De" />
                                <Input name="hourEnd" type="time" id="hourEnd" placeholder="Até" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 flex gap-2 text-sm items-center">
                        <CheckBox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)

                                }
                            }}
                            className=" p-1 w-6 h-6 rounded bg-zinc-900"
                        >
                            <CheckBox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400 " />
                            </CheckBox.Indicator>
                        </CheckBox.Root>Costumo me conectar ao chat de voz
                    </div>
                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close
                            type="button"
                            className="bg-zinc-500 px-5 h-12 rounded-md text-semibold hover:bg-zinc-600"
                        >
                            Cancelar
                        </Dialog.Close>
                        <button
                            type="submit"
                            className="bg-violet-500 px-5 h-12 rounded-md text-semibold flex items-center gap-3 hover:bg-violet-600"
                        >
                            <GameController className="w-6 h-6" />
                            Encontrar duo
                        </button>
                    </footer>
                </form>

            </Dialog.Content>
        </Dialog.Portal>
    )
}