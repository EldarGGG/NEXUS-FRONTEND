'use client';

// Utils
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Components
import Link from 'next/link';
import { Menu } from '../buyer/Menu';
import { Select } from '@/components/ui/Select';
import { ThemeSwitch } from '@/components/shared/ThemeSwitch';

// Styles
import styles from './Layout.module.scss';

// Icons
import { SavedIcon } from '@/assets/icons/Saved';
import { OrdersIcon } from '@/assets/icons/Orders';
import { ChatIcon } from '@/assets/icons/Chat';
import { SettingsIcon } from '@/assets/icons/Settings';
import { InfoIcon } from '@/assets/icons/Info';
import { ShopIcon } from '@/assets/icons/Shop';
import { SearchIcon } from '@/assets/icons/Search';
import { NotificationIcon } from '@/assets/icons/Notification';
import { UserIcon } from '@/assets/icons/User';
import { Field } from '../buyer/Field';
import { CartModal } from '../buyer/Cart';
import { useSelector } from '@/hooks/useSelector';

let URL = 'http://127.0.0.1:8000/api/v1';
const key =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyIjp7ImVtYWlsIjoickByLmNvbSIsInBob25lIjoiNzc3NzUxODc1MDEiLCJpZCI6IjEifX0.9l-B_e4JNSa8IKDren_e11ONeUVCkY33kyhSaplOjaM';

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const magazine = typeof window !== 'undefined' ? localStorage.getItem('activeMagazine') : null;


  const [cartSize, setCartSize] = useState(0);
  const products = useSelector((state) => state.buyerCart);

  const getAmount = async () => {
    const amount = await fetch(`${URL}/carts`, {
      headers: {
        Authorization: key,
      },
    });
    const data = await amount.json();
    let size = 0;
    data.items.forEach((product:any) => (size = size + product.amount));
    setCartSize(size);
  };

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  function handleToggleMenu() {
    setIsMenuOpen((prev) => !prev);
    setIsCartOpen(false);
  }

  function handleToggleCart() {
    setIsCartOpen((prev) => !prev);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    // products.forEach((product) => (size = size + product.count));
    getAmount();
  }, [products, cartSize]);

  return (
    <div className={styles['layout']}>
      <aside className={styles['sidebar']}>
        <Link href={`/shop/${magazine}`} className={styles['sidebar__logo']}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='81'
            height='13'
            viewBox='0 0 81 13'
            fill='none'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M75.9616 5.57877C78.8719 5.57877 80.3271 6.61375 80.3271 8.68572C80.3271 11.1644 78.6632 12.404 75.3353 12.404L64.5351 12.3885L66.8132 9.48358H75.6139C76.4369 9.48358 76.849 9.20629 76.849 8.65172C76.849 8.10823 76.4369 7.83749 75.6139 7.83749H69.283C67.8336 7.83749 66.7322 7.53703 65.9789 6.93649C65.2713 6.38204 64.9178 5.59577 64.9178 4.57678C64.9178 2.22198 66.5814 1.04508 69.9091 1.04508H80.014L77.7012 3.99942H69.6313C68.8077 3.99942 68.3963 4.25958 68.3963 4.78015C68.3963 5.31231 68.8077 5.57877 69.6313 5.57877H75.9616ZM63.5208 7.44649C63.5208 10.8758 61.1035 12.5912 56.2682 12.5912C53.4857 12.5912 51.445 12.1602 50.146 11.3004C48.8826 10.474 48.251 9.18917 48.251 7.44649V1.04458H51.8336V7.44649C51.8336 8.30668 52.112 8.88972 52.6685 9.19521C53.2484 9.51179 54.4481 9.67083 56.2682 9.67083C57.6365 9.67083 58.5874 9.50058 59.1209 9.16121C59.6425 8.83343 59.9034 8.26148 59.9034 7.44649V1.04458H63.5208V7.44649ZM47.2193 1.04458L43.5498 4.32216C42.2508 5.46556 41.387 6.20084 40.9586 6.5295C41.2134 6.699 42.1524 7.51902 43.7757 8.99146L47.4974 12.404H42.4191L38.4537 8.65172L34.3667 12.404H29.897L33.6882 8.99146C35.045 7.76861 35.9493 6.99379 36.4014 6.66475L36.2448 6.5465C36.1522 6.47863 36.0886 6.42763 36.0539 6.39388C35.9377 6.30296 35.7752 6.16696 35.5667 5.98614C35.1026 5.58997 34.4764 5.02961 33.6882 4.30503L30.1229 1.04458H35.1145L38.8189 4.57678L42.5584 1.04458H47.2193ZM29.4621 9.48346L27.149 12.404H15.9486V1.04458H29.4271L27.0969 3.99942H19.5656V5.35714H28.7836L26.7139 7.93785H19.5656V9.48346H29.4621ZM3.26915 5.73114V12.404H0V2.98055C0 2.26757 0.196834 1.72432 0.591273 1.35096C0.962108 1.02242 1.41988 0.858337 1.96497 0.858337C2.49885 0.858337 2.97932 1.06158 3.40884 1.46933L10.5391 7.71798V1.04458H13.8265V10.4516C13.8265 11.1646 13.6296 11.7078 13.235 12.0815C12.8754 12.4213 12.4118 12.5912 11.8438 12.5912C11.3217 12.5912 10.8408 12.387 10.4003 11.9798L3.26915 5.73114Z'
              fill='currentColor'
            />
          </svg>
        </Link>

        <nav className={styles['nav']}>
          <ul className={styles['nav__list']}>
            <li className={styles['nav__item']}>
              <Link href='#' className={cn(styles['nav__link'], styles['active'])}>
                <LogoIcon />
                <span>Главная страница</span>
              </Link>
            </li>

            <li className={styles['nav__item']}>
              <Link href='#' className={styles['nav__link']}>
                <SavedIcon />
                <span>Избранные</span>
              </Link>
            </li>

            <li className={styles['nav__item']}>
              <Link href={`/shop/${magazine}/orders`} className={styles['nav__link']}>
                <OrdersIcon />
                <span>Заказы</span>
              </Link>
            </li>

            <li className={styles['nav__item']}>
              <Link href='#' className={styles['nav__link']}>
                <ChatIcon />
                <span>Чат</span>
              </Link>
            </li>

            <li className={styles['nav__item']}>
              <Link href='#' className={styles['nav__link']}>
                <SettingsIcon />
                <span>Настройки</span>
              </Link>
            </li>

            <li className={styles['nav__item']}>
              <Link href='#' className={styles['nav__link']}>
                <InfoIcon />
                <span>Информация</span>
              </Link>
            </li>
          </ul>
        </nav>

        <button onClick={() => router.push('/seller/orders')} className={styles['user-role']}>
          <ShopIcon />
          <span>Продавец</span>
        </button>
      </aside>

      <div className={styles['wrapper']}>
        <header className={styles['header']}>
          <div className={styles['header__left']}>
            <button onClick={() => handleToggleMenu()} className={styles['header__menu-button']}>
              <MenuIcon />
            </button>

            <ThemeSwitch className={cn(styles['header__theme-switch'], styles['mobile'])} />

            <Field
              containerClassName={styles['header__search']}
              leftIcon={<SearchIcon />}
              placeholder='Поиск'
            />
          </div>

          <Link href={`/shop/${magazine}`} className={styles['header__logo']}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='81'
              height='13'
              viewBox='0 0 81 13'
              fill='none'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M75.9616 5.57877C78.8719 5.57877 80.3271 6.61375 80.3271 8.68572C80.3271 11.1644 78.6632 12.404 75.3353 12.404L64.5351 12.3885L66.8132 9.48358H75.6139C76.4369 9.48358 76.849 9.20629 76.849 8.65172C76.849 8.10823 76.4369 7.83749 75.6139 7.83749H69.283C67.8336 7.83749 66.7322 7.53703 65.9789 6.93649C65.2713 6.38204 64.9178 5.59577 64.9178 4.57678C64.9178 2.22198 66.5814 1.04508 69.9091 1.04508H80.014L77.7012 3.99942H69.6313C68.8077 3.99942 68.3963 4.25958 68.3963 4.78015C68.3963 5.31231 68.8077 5.57877 69.6313 5.57877H75.9616ZM63.5208 7.44649C63.5208 10.8758 61.1035 12.5912 56.2682 12.5912C53.4857 12.5912 51.445 12.1602 50.146 11.3004C48.8826 10.474 48.251 9.18917 48.251 7.44649V1.04458H51.8336V7.44649C51.8336 8.30668 52.112 8.88972 52.6685 9.19521C53.2484 9.51179 54.4481 9.67083 56.2682 9.67083C57.6365 9.67083 58.5874 9.50058 59.1209 9.16121C59.6425 8.83343 59.9034 8.26148 59.9034 7.44649V1.04458H63.5208V7.44649ZM47.2193 1.04458L43.5498 4.32216C42.2508 5.46556 41.387 6.20084 40.9586 6.5295C41.2134 6.699 42.1524 7.51902 43.7757 8.99146L47.4974 12.404H42.4191L38.4537 8.65172L34.3667 12.404H29.897L33.6882 8.99146C35.045 7.76861 35.9493 6.99379 36.4014 6.66475L36.2448 6.5465C36.1522 6.47863 36.0886 6.42763 36.0539 6.39388C35.9377 6.30296 35.7752 6.16696 35.5667 5.98614C35.1026 5.58997 34.4764 5.02961 33.6882 4.30503L30.1229 1.04458H35.1145L38.8189 4.57678L42.5584 1.04458H47.2193ZM29.4621 9.48346L27.149 12.404H15.9486V1.04458H29.4271L27.0969 3.99942H19.5656V5.35714H28.7836L26.7139 7.93785H19.5656V9.48346H29.4621ZM3.26915 5.73114V12.404H0V2.98055C0 2.26757 0.196834 1.72432 0.591273 1.35096C0.962108 1.02242 1.41988 0.858337 1.96497 0.858337C2.49885 0.858337 2.97932 1.06158 3.40884 1.46933L10.5391 7.71798V1.04458H13.8265V10.4516C13.8265 11.1646 13.6296 11.7078 13.235 12.0815C12.8754 12.4213 12.4118 12.5912 11.8438 12.5912C11.3217 12.5912 10.8408 12.387 10.4003 11.9798L3.26915 5.73114Z'
                fill='currentColor'
              />
            </svg>
          </Link>

          <div className={styles['header__right']}>
            <Select
              className={styles['header__select']}
              defaultValue={{ ru: 'Русский' }}
              options={{ kz: 'Қазақша', ru: 'Русский', en: 'English' }}
            />

            <button className={styles['header__notification']}>
              <NotificationIcon />
            </button>

            <ThemeSwitch className={cn(styles['header__theme-switch'], styles['desktop'])} />

            <button className={styles['header__user-profile']}>
              <UserIcon />
            </button>

            <button
              onClick={() => handleToggleCart()}
              data-value={cartSize}
              className={styles['header__cart']}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='10'
                height='12'
                viewBox='0 0 10 12'
                fill='none'
              >
                <path
                  opacity='0.972'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M4.68262 0.426757C5.94194 0.364217 6.84331 0.89742 7.38672 2.02637C7.52383 2.38608 7.5873 2.75848 7.57715 3.14355C7.88196 3.13931 8.18665 3.14355 8.49121 3.15625C8.86763 3.26182 9.10884 3.50303 9.21484 3.87988C9.38169 6.11847 9.54672 8.35709 9.70996 10.5957C9.66847 11.0942 9.40611 11.4074 8.92285 11.5352C6.29916 11.5521 3.67545 11.5521 1.05176 11.5352C0.568508 11.4074 0.306139 11.0942 0.264648 10.5957C0.427875 8.35709 0.592914 6.11847 0.759766 3.87988C0.866452 3.50237 1.10767 3.26116 1.4834 3.15625C1.78796 3.14355 2.09265 3.13931 2.39746 3.14355C2.37613 1.92042 2.92625 1.06984 4.04785 0.591796C4.25966 0.524061 4.47127 0.46905 4.68262 0.426757ZM4.75879 1.26465C5.77292 1.22561 6.42038 1.69111 6.70117 2.66113C6.72928 2.82076 6.74197 2.98156 6.73926 3.14355C5.57129 3.14355 4.40332 3.14355 3.23535 3.14355C3.26272 2.12242 3.77054 1.49613 4.75879 1.26465ZM1.71191 3.95605C1.94888 3.95605 2.18588 3.95605 2.42285 3.95605C2.42278 4.66727 2.41856 5.37821 2.41016 6.08887C2.51357 6.35008 2.704 6.44741 2.98145 6.38086C3.09944 6.32739 3.17985 6.23852 3.22266 6.11426C3.23535 5.39492 3.23959 4.6755 3.23535 3.95605C4.40332 3.95605 5.57129 3.95605 6.73926 3.95605C6.73502 4.6755 6.73926 5.39492 6.75195 6.11426C6.89107 6.40132 7.10689 6.47326 7.39941 6.33008C7.48496 6.27003 7.53998 6.18962 7.56445 6.08887C7.57715 5.37798 7.58139 4.66704 7.57715 3.95605C7.80582 3.95184 8.03433 3.95605 8.2627 3.96875C8.36682 3.98843 8.41336 4.0519 8.40234 4.15918C8.55174 6.30169 8.70833 8.44296 8.87207 10.583C8.85612 10.6276 8.83073 10.6657 8.7959 10.6973C6.25684 10.7142 3.71777 10.7142 1.17871 10.6973C1.14388 10.6657 1.11848 10.6276 1.10254 10.583C1.26395 8.39952 1.42899 6.21592 1.59766 4.03223C1.63343 3.9997 1.67152 3.97431 1.71191 3.95605Z'
                  fill='#EEF0F4'
                />
              </svg>
            </button>
          </div>
        </header>

        {isMenuOpen && <Menu />}
        {isCartOpen && (
          <CartModal
            onClose={() => {
              setIsCartOpen(false);
              setIsMenuOpen(false);
            }}
          />
        )}

        {children}
      </div>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width='20' height='18' viewBox='0 0 20 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1 1C1.37895 1 13.1579 1 19 1'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M1 9C1.37895 9 13.1579 9 19 9'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M1 17C1.37895 17 13.1579 17 19 17'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  );
}

function LogoIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='17' viewBox='0 0 16 17' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.84586 8.50059L1.21727 4.87197C1.10639 4.76096 1.10639 4.57983 1.21727 4.46882L3.96778 1.71846C4.07874 1.60732 4.26087 1.60687 4.37111 1.71846L6.63672 4.0084L7.00046 2.76454L5.17788 0.917799C4.62623 0.358785 3.71643 0.362685 3.16114 0.917799L0.416418 3.66224C-0.118721 4.19773 -0.137831 5.05857 0.358829 5.61739L1.49177 6.75394L3.23869 8.50059L0.416418 11.3226C-0.138806 11.8779 -0.138806 12.7839 0.416418 13.3392L3.16108 16.0835C3.71643 16.6388 4.62252 16.6388 5.17788 16.0835L6.93832 14.323L8.00021 13.2615L8.80373 12.4579L9.22025 12.0412L10.6286 10.6332L12.3264 12.3308L11.8307 12.8266L10.6803 11.6765L10.3165 12.9201L11.8306 14.4338L13.9337 12.3308L10.6286 9.02594L8.00021 11.6542L5.37145 9.02594L2.06643 12.3308L4.16954 14.4338L5.68331 12.9201L5.3199 11.6765L4.16954 12.8266L3.67392 12.3308L5.37145 10.6332L7.19656 12.4579L4.37111 15.2829C4.26015 15.3939 4.0788 15.3939 3.96778 15.2829L1.21727 12.5326C1.10639 12.4216 1.10639 12.2404 1.21727 12.1293L4.84586 8.50059ZM8.9817 14.2544L10.8224 16.0835C11.3792 16.6368 12.2835 16.6387 12.8388 16.0835L15.5835 13.3392C16.1388 12.7839 16.1388 11.8779 15.5835 11.3226L12.7613 8.50059L15.5835 5.67862C16.1388 5.12344 16.1388 4.21755 15.5835 3.66217L12.8388 0.917994C12.2835 0.362685 11.3777 0.362685 10.8224 0.917994L9.30878 2.43125L8.00021 3.73991L7.19656 4.54362L7.02678 4.71287L5.37145 6.3682L3.67392 4.6703L4.16954 4.17472L5.3199 5.32498L5.68331 4.08126L4.16954 2.56754L2.06643 4.6703L5.37145 7.97538L8.00021 5.34721L10.6286 7.97538L13.9337 4.6703L11.8306 2.56754L10.3165 4.08113L10.6803 5.32498L11.8307 4.17472L12.3264 4.6703L10.6286 6.3682L8.80373 4.54362L11.6291 1.71846C11.74 1.60732 11.9212 1.60732 12.0322 1.71846L14.783 4.46882C14.8939 4.57983 14.8939 4.76096 14.783 4.87197L11.154 8.50059L14.783 12.1293C14.8939 12.2404 14.8939 12.4216 14.783 12.5326L12.0322 15.2829C11.9212 15.3939 11.7403 15.3938 11.6291 15.2829L9.34563 13.0109L8.9817 14.2544ZM7.50407 8.50059L8.00021 8.99656L8.49583 8.50059L8.00021 8.00488L7.50407 8.50059ZM10.1031 8.50059L8.00021 10.6035L5.89709 8.50059L8.00021 6.39784L10.1031 8.50059Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.0117 8.5005L14.9887 9.47737V7.52358L14.0117 8.5005Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.00031 14.5122L7.02344 15.4892H8.97732L8.00031 14.5122Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M1.98677 8.5005L1.00977 9.47737V7.52358L1.98677 8.5005Z'
        fill='currentColor'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8.00019 14.4326L9.13429 15.5668H6.86595L8.00019 14.4326ZM13.9333 8.49985L15.0676 7.36583V9.63393L13.9333 8.49985ZM7.99999 2.56719L6.86588 1.43304H9.13423L7.99999 2.56719ZM2.06692 8.49998L0.932617 9.63399V7.36589L2.06692 8.49998Z'
        fill='currentColor'
      />
    </svg>
  );
}
