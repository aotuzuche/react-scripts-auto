import { getToken, toLogin } from 'auto-libs'
import { Button, Layout } from 'auto-ui'
import * as React from 'react'
import './style'

// 该文件请勿修改，脚手架自动生成、自动更新

const LoginPage: React.FC = () => {
  return (
    <Layout className="x-com-auth-tips-page">
      <Layout.Header title="提示" borderType="border" />
      <Layout.Body>
        <svg className="x-com-auth-icon" viewBox="0 0 1024 1024" width="200" height="200">
          <path
            d="M75.748631 449.510033v-7.244206C75.748631 203.891822 268.988869 10.65506 507.359398 10.65506h7.247682c238.370529 0 431.610767 193.236762 431.610767 431.610767v7.244206c0 238.374005-193.236762 431.614243-431.610767 431.614243h-7.247682C268.988869 881.124276 75.748631 687.884038 75.748631 449.510033"
            fill="#E4EBF7"
          />
          <path
            d="M219.718535 463.05642a28.611833 28.611833 0 1 1-56.938625-5.735576 28.611833 28.611833 0 0 1 56.938625 5.735576"
            fill="#FFFFFF"
          />
          <path
            d="M220.132192 561.638801a19.591336 19.591336 0 1 1-38.988011-3.928 19.591336 19.591336 0 0 1 38.988011 3.928m61.242044-55.68375a19.733857 19.733857 0 1 1-39.269575-3.955809 19.733857 19.733857 0 0 1 39.269575 3.955809M424.610682 103.613101l103.101319-0.045189a15.857998 15.857998 0 1 0-0.013904-31.722949l-103.101319 0.04519a15.861474 15.861474 0 0 0 0.01738 31.722948m39.432952 63.397231l103.097844-0.04519a15.861474 15.861474 0 1 0-0.013904-31.722948l-103.10132 0.04519a15.861474 15.861474 0 1 0 0.01738 31.722948"
            fill="#FFFFFF"
          />
          <path
            d="M472.254198 103.567912V103.557483l54.56792-0.024333a15.861474 15.861474 0 1 0 0.013905 31.722949l-54.567921 0.024332v-0.006952a15.857998 15.857998 0 0 0-0.013904-31.709044m247.981963 376.187725c-1.911859 18.962161-18.833545 32.786637-37.795706 30.874778-18.965637-1.911859-32.786637-18.833545-30.874778-37.795706 1.911859-18.962161 18.833545-32.786637 37.795706-30.874779 18.962161 1.911859 32.786637 18.833545 30.874778 37.795707"
            fill="#FFFFFF"
          />
          <path
            d="M720.740197 598.645431a23.630572 23.630572 0 1 1-47.024769-4.737933 23.630572 23.630572 0 0 1 47.021293 4.737933m64.554774-57.845888a23.804377 23.804377 0 1 1-47.368904-4.779647 23.804377 23.804377 0 0 1 47.365428 4.779647"
            fill="#FFFFFF"
          />
          <path
            d="M703.811558 102.931784C703.811558 46.646667 749.438932 1.012341 805.731001 1.012341c56.288593 0 101.919443 45.63085 101.919444 101.919443 0 56.292069-45.63085 101.926396-101.919444 101.926396-56.288593 0-101.919443-45.634326-101.919443-101.92292"
            fill="#A26EF4"
            data-spm-anchor-id="a313x.7781069.0.i3"
            className=""
          />
          <path
            d="M845.532421 145.986839l-74.955285-0.434513a6.06233 6.06233 0 0 1-6.027569-6.097091l0.246804-42.512783a6.06233 6.06233 0 0 1 6.097091-6.027568l74.951809 0.434513c3.350967 0.020857 6.048425 2.7496 6.031045 6.100567l-0.246804 42.509307a6.06233 6.06233 0 0 1-6.097091 6.027568"
            fill="#FFFFFF"
          />
          <path
            d="M823.480001 102.486842c-0.052142 8.957927-7.122542 16.1778-15.791952 16.129135-8.66941-0.048665-15.656384-7.351965-15.604242-16.313368l0.139044-24.072038c0.055618-8.957927 7.126018-16.1778 15.791952-16.129134 8.66941 0.052142 15.656384 7.355441 15.607719 16.313368l-0.139045 24.072037z m-15.746762-48.922723a23.905185 23.905185 0 0 0-24.040753 23.76614l-0.149473 25.611953a23.905185 23.905185 0 0 0 47.81037 0.278089l0.145996-25.611953a23.908661 23.908661 0 0 0-23.76614-24.044229z m-149.507342 185.099197h-13.661099a16.441984 16.441984 0 0 1-16.396794-16.396795 16.441984 16.441984 0 0 1 16.396794-16.396794h13.661099a16.441984 16.441984 0 0 1 16.396795 16.396794 16.441984 16.441984 0 0 1-16.396795 16.396795"
            fill="#FFFFFF"
          />
          <path
            d="M660.478414 865.999736a22.98054 22.98054 0 0 1-22.977064-22.98054v-229.79845a22.98054 22.98054 0 0 1 45.957604 0v229.79845a22.98054 22.98054 0 0 1-22.977064 22.977064"
            fill="#5BA02E"
          />
          <path
            d="M688.054367 863.698554a22.98054 22.98054 0 0 1-22.977064-22.977064v-114.899225a22.98054 22.98054 0 1 1 45.957604 0v114.895749a22.98054 22.98054 0 0 1-22.977064 22.98054"
            fill="#92C110"
          />
          <path
            d="M722.283588 1022.605288h-95.161892a11.019258 11.019258 0 0 1-11.019258-11.019258v-159.5081a11.019258 11.019258 0 0 1 11.019258-11.019258h95.161892a11.019258 11.019258 0 0 1 11.019258 11.019258v159.504624a11.019258 11.019258 0 0 1-11.019258 11.019258"
            fill="#F2D7AD"
            data-spm-anchor-id="a313x.7781069.0.i1"
            className=""
          />
          <path
            d="M360.692035 514.33942s22.167131-3.222351 61.061287-4.449417c40.771253-1.289636 61.075192 3.775052 61.075192 3.775052s12.851166-13.400391 3.364871-29.282721c4.442464-41.980939 20.794069-114.110149 1.164496-167.802091-3.879335-4.654507-13.011067-5.255873-26.195939-2.155186-4.647554 1.094974-24.843733-0.51794-27.749758-0.34761l-53.222667-1.206209s-12.121183-0.590938-27.930516-1.765862c-5.255873-0.3928-14.693502-5.850287-18.97259-1.174924-1.411299 1.539915-8.429558 19.706048-6.84793 55.885364l30.01618 123.895389s-10.918451 12.548745 4.237374 24.628215"
            fill="#FFFFFF"
          />
          <path
            d="M339.12627 255.897852l-3.128496-22.236654 41.650709-22.664214s25.38253-0.410181 27.940944 4.188708c2.561891 4.602365-19.521814 3.451774-19.521814 3.451774s-6.382132 4.824836-9.090019 8.690266c-5.74948 8.21404-3.427441 22.493885-28.914254 20.807974-5.93719 0.987214-8.933594 7.762146-8.933594 7.762146"
            fill="#FFC6A0"
          />
          <path
            d="M258.035657 271.008487s49.419806 32.696258 86.808808 50.208882c3.688149 1.727625-7.278967 56.253832-41.337858 41.056295-25.848328-11.533721-70.08526-29.338339-74.673721-50.389641-2.468036-11.325155 8.839739-26.567882 29.202771-40.879012m310.840398 8.488652s-23.265581 10.424843-48.123219 23.901708c-13.535959 7.334585-35.237292 16.351605-42.860393 27.767139-21.635287 32.376456 12.291513 39.001915 45.005151 26.081227 23.324675-9.215158 100.803613-42.154744 45.978461-77.750074"
            fill="#FFB594"
          />
          <path
            d="M340.509761 231.68677l10.636886 13.490769s-9.674004 9.281204-21.934233 19.977184c-24.690785 21.53448-44.504592 49.694419-55.600323 57.147192-13.786238 9.253396-33.905943 11.519817-42.32855-0.410181-12.350606-17.491768 1.612913-50.848486 109.22622-90.204964"
            fill="#FFC6A0"
          />
          <path
            d="M300.562344 296.884624s-8.134089 29.244484-30.979061 50.219311c2.266421 1.904906 64.606916 36.53388 76.974903 34.955727 18.207846-2.325515 22.306176-65.934789 3.980142-71.367943-2.440227-0.72303-20.512505-4.470273-30.773971-7.532723-3.024213-0.903788-5.600008-5.944142-12.322798-3.253636l-6.882691-3.020736z m221.386273 2.468035s18.485935 6.799264 25.46248 47.740847c-1.897954 0.952453-61.00567 42.929916-75.879929 27.131012-22.71288-24.124179-2.662698-60.459921 14.860355-64.690343 16.149991-3.896715 17.484816-4.762266 35.56057-10.181516"
            fill="#FFFFFF"
          />
          <path
            d="M483.092698 239.608817l-23.571478-21.471911s-18.61455-14.995924-32.060131-3.104163c-13.442104 11.895237 15.513863 7.24073 19.65043 14.477984 4.136567 7.237254 2.947738 3.97319-7.240729 1.550344-19.476625-4.626698-7.237254 3.104163 10.341416 18.61455 7.268539 6.413417 24.304937 3.319682 24.304937 3.319682l8.575555-13.386486z"
            fill="#FFC6A0"
          />
          <path
            d="M441.720078 318.433008l-1.032403-38.018177-55.332664-0.093855-1.842337 36.325313c-0.090379 1.400871 0.590938 2.739172 1.790195 3.472631 7.122542 4.348609 32.630212 17.703811 54.919007 1.473869 0.997643-0.729982 1.539915-1.925763 1.498202-3.163257"
            fill="#FFB594"
          />
          <path
            d="M449.683838 259.078489c2.839979-3.987094 3.413537-31.695139 3.528248-41.462998a3.636007 3.636007 0 0 0-3.354442-3.667293l-16.059613-1.268779c-26.800781-3.629055-59.340615 2.16909-63.449372 22.059372-19.056016 20.206607-1.463441 46.037555-1.463441 46.037555s6.823597 12.395796 14.964639 23.60624c2.627937 3.618627 1.38349-12.969353 10.567364-20.609836 19.202012-15.969233 55.266618-24.690785 55.266617-24.690785"
            fill="#5C2552"
          />
          <path
            d="M383.126827 290.24526s9.333346 21.558813 40.329788 22.671167c27.183153 0.97331 31.191104-24.360555 25.841375-60.849245l-3.15978-19.059492c-21.26682-10.070281-53.803177 1.877098-53.803177 1.877098s-2.002237 7.105162-0.66046 19.13249c-7.911618 7.181636-6.340418 19.528766-6.340419 19.528767s-3.145876-6.681077-6.882691-8.068044c-2.989452-1.112354-6.594174 0.309373-8.071519 6.882691-3.615151 16.101325 12.746883 17.884568 12.746883 17.884568"
            fill="#FFC6A0"
          />
          <path
            d="M442.63777 258.564025c-0.076474 2.478464-1.5712 4.44594-3.337062 4.390323-1.772814-0.055618-3.1424-2.109997-3.065926-4.588461 0.072998-2.478464 1.5712-4.442464 3.337062-4.390322 1.772814 0.055618 3.1424 2.109997 3.065926 4.58846m-27.648951 0.89336c-0.076474 2.478464-1.5712 4.442464-3.340538 4.390322-1.769338-0.055618-3.1424-2.109997-3.065926-4.58846 0.076474-2.478464 1.5712-4.44594 3.340538-4.390323 1.772814 0.055618 3.1424 2.106521 3.065926 4.588461"
            fill="#552950"
          />
          <path
            d="M422.580636 285.715893s-12.486175 0.806457-5.005594-9.698337c5.527009-5.200255 17.022494-1.599009 17.022494-1.599009s4.018379 13.577672-12.0169 11.297346"
            fill="#DB836E"
          />
          <path
            d="M466.344817 230.119046l-0.493607 18.492886s20.832306 15.545148 41.522092 31.987133c15.579909 12.381891 30.895635 25.914374 38.18503 30.110034 16.699216 9.614911 30.937348 11.662337 38.501356 6.284801 14.15123-10.059852 15.201014-34.33698-28.281602-53.055814-14.846451-6.389084-56.118264-22.108038-89.433269-33.822516"
            fill="#FFC6A0"
          />
          <path
            d="M428.642966 1009.938355s15.037637 7.150351 25.750997 3.58039c9.879095-3.295349 15.86495 2.33942 24.791591 4.122662 8.933594 1.786719 24.072038 3.851526 40.920726-4.411179-0.361515-19.295867-24.120703-13.939187-41.880131-23.508908-8.975307-4.831788-13.250918-16.535839-12.600886-30.808732h-32.922205s-4.873501 36.832825-4.063569 51.029244"
            fill="#CBD1D1"
          />
          <path
            d="M428.559539 1009.336989s8.506033 4.452892 23.668809 2.287278c10.709884-1.529487 13.000638 1.685912 25.997801 3.611675 12.997162 1.925763 37.548903-0.243327 41.400429-3.128496 1.442584 3.851526-1.206209 7.219873-1.206209 7.219873s-5.29411 2.113473-16.848689 2.888645c-7.108638 0.476227-20.31089 1.018499-26.637404-1.762386-6.256992-4.814408-18.374699-6.663696-20.057135-0.844694-13.720192 3.33011-25.757949-1.001119-25.757949-1.001119l-0.556177-9.270776z"
            fill="#2B0849"
          />
          <path
            d="M454.032448 961.078202h10.831548s-0.358039 23.467195 15.885806 29.964038c-16.243846 2.16909-29.964038-8.064567-26.717354-29.964038"
            fill="#A4AABA"
          />
          <path
            d="M276.146172 948.320891s-7.376298 25.966516-15.705049 43.089817c-6.295229 12.945021-14.790833 26.237652 19.135966 26.237652 23.282962 0 31.354481-1.678959 25.997801-23.109156-5.35668-21.426721 0.931597-46.218312 0.931597-46.218313H276.146172z"
            fill="#CBD1D1"
          />
          <path
            d="M254.907161 1009.222277s7.338061 4.094853 23.227344 4.094854c21.301581 0 28.886445-5.777289 28.886445-5.777289s2.103044 3.900192-2.16909 7.577912c-3.476107 2.996404-12.59741 5.572199-25.876137 5.41925-14.519697-0.170329-20.425602-1.981381-23.588859-4.091377-2.888645-1.925763-2.405466-5.537438-0.479703-7.22335"
            fill="#2B0849"
          />
          <path
            d="M279.215574 954.988063s0.118188 5.314967-1.094973 10.254515c-1.223589 4.974308-3.778528 10.869785-3.959286 14.495364-0.201614 4.032284 15.885807 5.533962 18.054898 0.121664 2.165614-5.41925 4.529367-22.50779 6.698457-25.396435 2.162138-2.888645-17.171966-7.421487-19.699096 0.521416"
            fill="#A4AABA"
          />
          <path
            d="M426.435638 963.94599l46.253073 0.319802s4.487654-188.502305 6.406465-222.66548c1.918811-34.163175 13.056256-149.924474 3.465678-218.257776l-43.38181-2.224709-78.99452 2.697459s-1.505154 13.709764-4.136567 34.486453c-0.215519 1.713721-2.353324 2.912977-2.586223 4.720553-0.260708 2.023094 1.459965 4.682315 1.105401 6.799264-8.16885 48.67592-22.048944 114.454283-30.231698 161.378245-0.403228 2.304659-4.265183 3.490011-5.040354 9.305538-0.139044 1.042832 0.729982 5.269777 0.389323 6.20485-23.762664 64.805054-37.8548 165.407053-49.360712 213.957833l50.500875-0.048666s7.595293-29.630332 13.932235-58.669726c9.719194-44.553257 79.905261-293.915235 79.905261-293.915235l10.42832-1.797147 3.604722 160.248511s-0.775172 4.268659 1.16102 6.980022c1.939667 2.718315-1.932715 3.882811-1.355682 7.762146l1.355682 6.201374s-1.550344 24.819401-3.100687 41.108435c-1.550344 16.285559-0.319802 135.408254-0.319802 135.408254"
            fill="#7BB2F9"
          />
          <path
            d="M483.763587 513.470393s-58.937386-10.730741-124.097003 0.691745c0.545749 8.693742-0.006952 14.349368-0.006953 14.349368s50.775488-9.74005 123.318356-1.077593c0.872503-8.141041 0.7856-13.96352 0.7856-13.96352"
            fill="#192064"
          />
          <path
            d="M449.46832 523.655385l0.013904-16.98078a2.805218 2.805218 0 0 0-2.690506-2.815646c-8.439987-0.319802-17.519577-0.37542-27.096251-0.048666a2.829551 2.829551 0 0 0-2.725267 2.815646l-0.010429 16.9634c0 1.585105 1.289636 2.850407 2.874741 2.808694a489.296755 489.296755 0 0 1 26.724307 0.059094 2.815646 2.815646 0 0 0 2.909501-2.801742"
            fill="#FFFFFF"
          />
          <path
            d="M445.613318 520.433034l0.006952-10.636886a2.224708 2.224708 0 0 0-2.141282-2.235136 327.223288 327.223288 0 0 0-20.279605-0.031285 2.249041 2.249041 0 0 0-2.176043 2.235137l-0.003476 10.622981c0 1.251398 1.011547 2.252517 2.262945 2.224708 6.18747-0.139044 12.889403-0.14252 20.029326 0.041714a2.238613 2.238613 0 0 0 2.301183-2.224709"
            fill="#192064"
          />
        </svg>
        <p className="x-com-auth-tips">访问当前页面需要验证您的身份</p>
        <Button
          className="x-com-auth-button"
          onClick={() => {
            toLogin()
          }}
        >
          去登录
        </Button>
      </Layout.Body>
    </Layout>
  )
}

const Auth = (View: any, showTipsPage: boolean = process.env.NODE_ENV === 'development') => {
  if (!getToken()) {
    if (showTipsPage) {
      return LoginPage
    } else {
      toLogin()
      return null
    }
  }
  return View
}

export default Auth
