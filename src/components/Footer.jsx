/* global GITHUB_URL DONATE_PAYPAL_URL DONATE_LINODE_URL DONATE_DO_URL
          DISCORD_URL GIT_COMMIT_HASH GIT_SHORT_COMMIT_HASH */
import React from 'react';

import '../scss/Footer.scss';
import GitHubCommitLink from './GitHubCommitLink';


const external_links = [
  {
    href: "https://github.com/potholderz/openuni",
    children: 'Paypal',
  },
  {
    href: "https://github.com/potholderz/openuniL",
    children: 'Linode',
  },
  {
    href: "https://github.com/potholderz/openuni",
    children: 'DigitalOcean',
  },
  {
    href: "https://github.com/potholderz/openuni",
    children: 'GitHub',
  },
];

const Footer = () =>
  <footer>
    <div className='container'>
      <p className='text-muted'>
        OverRustle.com, an unofficial <a href='https://destiny.gg'>destiny.gg</a> community
        <br />
        By <a href={`https://github.com/potholderz/openuni/graphs/contributors`}>memers</a> on <a href={``}>discord</a>
        <br />
        Support us via{'\u00a0'}
        {
          external_links
          .filter(({ href }) => href)
          .map((props, i) => <a key={i} {...props} target='_blank' rel='noopener noreferrer' />)
          .reduce((acc, curr, i, arr) => {
            acc.push(curr);
            if (i !== arr.length - 1) {
              acc.push(',\u00a0');
            }
            return acc;
          }, [])
        }
        <br />
        <a href='/api'>API</a>
        &nbsp; &bull; &nbsp;
      </p>
    </div>
  </footer>
  ;

export default Footer;
