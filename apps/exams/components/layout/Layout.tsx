import React from 'react'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { SocialButtons } from '../SocialButtons'
import { Text } from '@chakra-ui/react'
import { GeneralInformation } from '../../GeneralInformation'

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
        <>
            <div className={styles.container}>
                <Head>
                    <title>The Office English Learning</title>
                    <meta name="description" content="Conocé tu nivel de ingles en menos de 15 minutos con nuestro test de nivelación." />
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="theme-color" content="#3394b3" />
                    <meta
                        property="og:image"
                        content="/logo.jpg"
                    />
                </Head>

                <main className={styles.main}>
                    {children}
                </main>
                <footer className={styles.footer} >
                    <Text fontWeight='bold'>{GeneralInformation.PROJECT_NAME} {new Date().getFullYear()}</Text>
                    <SocialButtons />
                </footer>
            </div>
        </>
  )
}
