import React from "react"
import { Box, IconButton } from "@mui/material"
import { ArrowLeftIcon } from "@mui/x-date-pickers"
import { useNavigate } from "react-router-dom"
import { colors } from "../style/colors"
import Logo from "../assets/logo/adaptive-icon.png"

interface TermsProps {}

export const Terms: React.FC<TermsProps> = ({}) => {
    const navigate = useNavigate()
    return (
        <Box sx={{ padding: "6vw", height: "100%", overflowY: "hidden", gap: "3vw" }}>
            <Box sx={{ gap: "2vw", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <IconButton onClick={() => navigate("/home")}>
                    <ArrowLeftIcon />
                </IconButton>
                <strong style={{ fontSize: "1.2rem", color: colors.primary }}>Terms &amp; Conditions</strong>
                <img src={Logo} style={{ width: "15vw", height: "15vw" }} />
            </Box>

            <Box sx={{ height: "100%", overflowY: "auto", textAlign: "justify" }}>
                <p>
                    Estes termos e condições aplicam-se ao aplicativo Bump Agritech (doravante referido como "Aplicativo")
                    para dispositivos móveis que foi criado pela Bump Agritech (doravante referida como "Prestador de
                    Serviços") como um serviço gratuito.
                </p>
                <br />
                <p>
                    Ao baixar ou utilizar o Aplicativo, você automaticamente concorda com os seguintes termos. É altamente
                    recomendável que você leia e entenda completamente estes termos antes de usar o Aplicativo. A cópia não
                    autorizada, modificação do Aplicativo, qualquer parte do Aplicativo, ou nossas marcas registradas é
                    estritamente proibida. Tentativas de extrair o código-fonte do Aplicativo, traduzir o Aplicativo para
                    outros idiomas ou criar versões derivadas não são permitidas. Todas as marcas registradas, direitos
                    autorais, direitos de banco de dados e outros direitos de propriedade intelectual relacionados ao
                    Aplicativo permanecem de propriedade do Prestador de Serviços.
                </p>
                <br />
                <p>
                    O Prestador de Serviços está empenhado em garantir que o Aplicativo seja o mais benéfico e eficiente
                    possível. Como tal, eles reservam o direito de modificar o Aplicativo ou cobrar por seus serviços a
                    qualquer momento e por qualquer motivo. O Prestador de Serviços garante que quaisquer cobranças pelo
                    Aplicativo ou seus serviços serão claramente comunicadas a você.
                </p>
                <br />
                <p>
                    O Aplicativo armazena e processa dados pessoais que você forneceu ao Prestador de Serviços para fornecer
                    o Serviço. É sua responsabilidade manter a segurança do seu telefone e o acesso ao Aplicativo. O
                    Prestador de Serviços desaconselha fortemente o desbloqueio ou root do seu telefone, o que envolve a
                    remoção de restrições e limitações de software impostas pelo sistema operacional oficial do seu
                    dispositivo. Tais ações podem expor seu telefone a malware, vírus, programas maliciosos, comprometer os
                    recursos de segurança do seu telefone e podem resultar no funcionamento incorreto ou na falta de
                    funcionamento do Aplicativo.
                </p>
                <div>
                    <p>
                        Por favor, note que o Aplicativo utiliza serviços de terceiros que têm seus próprios Termos e
                        Condições. Abaixo estão os links para os Termos e Condições dos provedores de serviços de terceiros
                        usados pelo Aplicativo:
                    </p>
                    <Box sx={{ pr: "4vw", pl: "4vw", pt: "4vw" }}>
                        <ul>
                            <li>
                                <a
                                    style={{ color: colors.primary }}
                                    href="https://policies.google.com/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Serviços do Google Play
                                </a>
                            </li>
                            <li>
                                <a
                                    style={{ color: colors.primary }}
                                    href="https://expo.io/terms"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Expo
                                </a>
                            </li>
                            <li>
                                <a
                                    style={{ color: colors.primary }}
                                    href="https://www.mapbox.com/legal/tos"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Mapbox
                                </a>
                            </li>
                        </ul>
                    </Box>
                </div>
                <br />
                <p>
                    Esteja ciente de que o Prestador de Serviços não assume responsabilidade por certos aspectos. Algumas
                    funções do Aplicativo requerem uma conexão de internet ativa, que pode ser Wi-Fi ou fornecida pelo seu
                    provedor de rede móvel. O Prestador de Serviços não pode ser responsabilizado se o Aplicativo não
                    funcionar plenamente devido à falta de acesso ao Wi-Fi ou se você tiver excedido sua cota de dados.
                </p>
                <br />
                <p>
                    Se você estiver usando o aplicativo fora de uma área Wi-Fi, esteja ciente de que os termos do acordo do
                    seu provedor de rede móvel ainda se aplicam. Consequentemente, você pode incorrer em cobranças do seu
                    provedor móvel pelo uso de dados durante a conexão com o aplicativo, ou outras cobranças de terceiros. Ao
                    usar o aplicativo, você aceita a responsabilidade por tais cobranças, incluindo cobranças de roaming de
                    dados se você usar o aplicativo fora do seu território doméstico (ou seja, região ou país) sem desativar
                    o roaming de dados. Se você não for o pagador da conta do dispositivo em que está usando o aplicativo,
                    eles assumem que você obteve permissão do pagador da conta.
                </p>
                <br />
                <p>
                    Da mesma forma, o Prestador de Serviços não pode sempre assumir responsabilidade pelo seu uso do
                    aplicativo. Por exemplo, é sua responsabilidade garantir que seu dispositivo permaneça carregado. Se o
                    seu dispositivo ficar sem bateria e você não puder acessar o Serviço, o Prestador de Serviços não poderá
                    ser responsabilizado.
                </p>
                <br />
                <p>
                    Em termos da responsabilidade do Prestador de Serviços pelo seu uso do aplicativo, é importante observar
                    que, embora eles se esforcem para garantir que ele seja atualizado e preciso em todos os momentos, eles
                    dependem de terceiros para fornecer informações para que possam disponibilizá-lo para você. O Prestador
                    de Serviços não aceita nenhuma responsabilidade por qualquer perda, direta ou indireta, que você possa
                    sofrer como resultado de depender exclusivamente dessa funcionalidade do aplicativo.
                </p>
                <br />
                <p>
                    O Prestador de Serviços pode desejar atualizar o aplicativo em algum momento. O aplicativo está
                    atualmente disponível conforme os requisitos para o sistema operacional (e para quaisquer sistemas
                    adicionais que eles decidam estender a disponibilidade do aplicativo) podem mudar, e você precisará
                    baixar as atualizações se quiser continuar usando o aplicativo. O Prestador de Serviços não garante que
                    sempre atualizará o aplicativo para que ele seja relevante para você e/ou compatível com a versão
                    específica do sistema operacional instalada no seu dispositivo. No entanto, você concorda em sempre
                    aceitar atualizações do aplicativo quando oferecidas a você. O Prestador de Serviços também pode desejar
                    interromper o fornecimento do aplicativo e pode encerrar seu uso a qualquer momento sem fornecer aviso de
                    término a você. A menos que eles informem o contrário, após qualquer término, (a) os direitos e licenças
                    concedidos a você nestes termos terminarão; (b) você deve cessar o uso do aplicativo e, se necessário,
                    excluí-lo do seu dispositivo.
                </p>
                <br />
                <strong>Alterações a Estes Termos e Condições</strong>
                <p>
                    O Prestador de Serviços pode atualizar periodicamente seus Termos e Condições. Portanto, é aconselhável
                    que você revise esta página regularmente para quaisquer alterações. O Prestador de Serviços o notificará
                    sobre quaisquer alterações postando os novos Termos e Condições nesta página.
                </p>
                <br />
                <p>Estes termos e condições são eficazes a partir de 21 de março de 2024</p>
                <br />
                <strong>Entre em Contato</strong>
                <p>
                    Se você tiver alguma dúvida ou sugestão sobre os Termos e Condições, não hesite em contatar o Prestador
                    de Serviços em eduardo@bump.ind.br.
                </p>
                <hr />
                <p>
                    Esta página de Termos e Condições foi gerada por
                    <a href="https://app-privacy-policy-generator.nisrulz.com/" target="_blank" rel="noopener noreferrer">
                        Gerador de Política de Privacidade do Aplicativo
                    </a>
                </p>
            </Box>
        </Box>
    )
}
