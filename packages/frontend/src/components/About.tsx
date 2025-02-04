import React from 'react'

import { Heading } from './Heading'

export function About() {
  return (
    <section className="text-base mt-8">
      <Heading level={2} id="about" title="About L2BEAT" />
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="flex flex-col gap-4">
          <p>
            L2BEAT is an analytics and research website about Ethereum layer two
            (L2) scaling. We provide a comparison of the various Ethereum L2
            systems available today.
          </p>
          <p>
            An important differentiator between L2BEAT and similar sites is that
            L2BEAT is committed to educating users and lists only projects that
            match our narrow definition of L2. We define layer two as a chain
            that fully or partially derives its security from layer one Ethereum
            so that users do not have to rely on the honesty of L2 validators
            for the security of their funds.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p>
            Because of our commitment to education we present various
            non-trivial metrics aside from Total Value Locked (TVL). We have
            carefully examined each L2 project to determine the inner workings
            of their technology as well as the associated risks. To learn about
            any of our listed projects visit their respective page on L2BEAT.
          </p>
          <p>
            We have also compiled a list of{' '}
            <a className="text-link underline" href="/faq">
              Frequently Asked Questions
            </a>{' '}
            that will help explain some of the decisions we made for our site.
            We hope you find L2BEAT a valuable resource.
          </p>
        </div>
      </div>
    </section>
  )
}
