import Image from "next/image";
import styles from "./page.module.scss";
import FormMain from "./components/FormMain";

export default function Home() {
  return (
    <main className={styles.main}>
      <section>
        <div className="questionary">
          <FormMain />
        </div>
        <div className="placeholder">placeholder</div>
      </section>
    </main>
  );
}
