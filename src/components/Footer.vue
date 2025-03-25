<template>
    <footer>
        <div className="footerLinks">
            <div className="footerLogo">
                <img src="../assets/images/logo.png" alt="T-Square Logo"></img>
                <span>T-Square</span>
            </div>
        </div>
        <div className="footerCopyright">
            <p>&copy; T-Square {{currentYear}}</p>
        </div>
    </footer>
</template>

<script setup lang="ts">
    const currentYear = new Date().getFullYear();
</script>

<style>
    footer {
        display: flex;
        flex-direction: column;
        padding: 50px;
        border-radius: 20px 20px 0 0;
        background-color: var(--footer-background);
        color: #fff;
        gap: 25px;
    }

    .footerLogo {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    .footerLogo img {
        width: 50px;
    }
    .footerLogo span {
        font-size: 20px;
        font-weight: 500;
    }

    .footerCopyright {
        padding: 10px;
        border-radius: 20px;
        background-color: var(--footer-background2);
    }
    .footerCopyright p {
        font-size: 15px;
        font-weight: 300;
        text-align: center;
    }
</style>